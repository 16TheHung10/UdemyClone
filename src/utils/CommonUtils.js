export const formatSpecialized = (specialize) => {
  return specialize?.reduce((acc, curr, currIndex, arr) => {
    if (currIndex !== 0 && arr.length > 2) acc.push(`, ${curr.name}`);
    else if (currIndex === 1 && arr.length === 2) acc.push(` & ${curr.name}`);
    else acc.push(curr.name);
    return acc;
  }, []);
};
