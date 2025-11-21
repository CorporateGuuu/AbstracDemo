export const extractHashtags = (text: string) => {
  return text.match(/#[\\w]+/g)?.map(tag => tag.slice(1).toLowerCase()) || [];
};
