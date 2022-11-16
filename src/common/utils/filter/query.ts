enum QueryOperator {
  EQ = 'eq',
  LIKE = 'like',
  BETWEEN = 'between',
  ISNULL = 'isnull',
  IN = 'in',
}

const QueryOperatorsPattern = `_(${QueryOperator.EQ}|${QueryOperator.LIKE}|${QueryOperator.BETWEEN}|${QueryOperator.ISNULL}|${QueryOperator.IN})`;
const QueryOperatorsRegex = new RegExp(QueryOperatorsPattern, 'g');

function resolveOperator(queryOperator: string) {
  const matchOperator = queryOperator.match(QueryOperatorsRegex) as string[];
  const match = matchOperator[matchOperator.length - 1];

  const field = queryOperator.split(match)[0];
  const operator = match.replace('_', '').trim();

  return [field, operator];
}

function resolveQuery(field: string, value: any, operator: string) {
  switch (operator) {
    case QueryOperator.EQ:
      return {
        [field]: value,
      };

    case QueryOperator.LIKE:
      return {
        [field]: {
          contains: value,
        },
      };

    case QueryOperator.BETWEEN:
      return {
        [field]: {
          lte: value[1],
          gte: value[0],
        },
      };

    case QueryOperator.ISNULL:
      return !!value
        ? {
            NOT: {
              [field]: null,
            },
          }
        : {
            [field]: null,
          };

    case QueryOperator.IN: {
      return {
        [field]: {
          in: value,
        },
      };
    }

    default:
      return;
  }
}

function resolveRelation(field: string, value: any) {
  const result = {};
  let object: Record<string, unknown> = result;

  field.split('.').map((k: string, i: number, values: string[]) => {
    object[k] =
      i == values.length - 1
        ? values.length > 1
          ? { some: value }
          : value
        : {};
    object = object[k] as Record<string, unknown>;
  });

  return result;
}

export function standardizedQueries(input: Record<string, unknown>) {
  const queries = Object.keys(input).map((key) => {
    if (key.includes('.')) {
      const resolveFields = key.split('.');
  
      const relationKey = resolveFields[resolveFields.length - 1];
      const parent = key.replace(`.${relationKey}`, '').trim();
  
      const [relationField, relationOperator] = resolveOperator(relationKey);
  
      return {
        ...resolveRelation(
          parent,
          resolveQuery(
            relationField,
            input[key],
            relationOperator,
          ),
        ),
      };
    }
  
    const [field, operator] = resolveOperator(key);
    const query = resolveQuery(
      field,
      input[key],
      operator,
    );
    return query;
  });

  return {
    where: {
      AND: queries
    }
  }
}
