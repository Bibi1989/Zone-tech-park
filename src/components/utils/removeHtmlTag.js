export const removeHtmlTag = (text) => {
  let texts = text.replace(/(<([^>]+)>)/gi, "");
  return texts;
};
