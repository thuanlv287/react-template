import { request } from './request'

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export {
  canUseDOM,
  request
}