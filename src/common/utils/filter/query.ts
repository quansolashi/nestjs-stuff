/*
sample input:
{
  "id_eq": xxxxx,
  "name_like": "yyyyyy",
  "post.id_in": [x, y, z]
}
*/

const sampleInput = {
  id_eq: 'x',
  name_like: 'yyyyyy',
  'post.id_in': ['x', 'y', 'z'],
};

export function standardizedQueries(input: any) {
  return input;
}
