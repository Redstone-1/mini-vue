export function createElement(tag, data, ...children) {
  console.log('tag>>>>>', tag);
  console.log('data>>>>>', data);
  console.log('children>>>>>', children);
}

export function createTextNode(text) {
  console.log('text>>>>>', text);
}