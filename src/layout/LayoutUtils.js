export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label: label,
    type,
  };
}

//Devider define
export const dividerItem = {
  type: 'divider',
};
//Style Common URL Sidebar component
export const changeParentElement = (value) => {
  if (document.getElementsByClassName('common-url')[0]) {
    const x = document.getElementsByClassName('common-url')[0];
    x.parentElement.style.display = 'flex';
    x.parentElement.style.alignItems = 'center';
    x.parentElement.parentElement.style.height = value;
    x.parentElement.parentElement.style.height = value;
  }
};
