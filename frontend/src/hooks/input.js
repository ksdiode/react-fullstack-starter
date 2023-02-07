import { useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  return [
    {
      value,
      onChange: (e) => setValue(e.target.value),
    },
    (value = initialValue) => setValue(value),
  ];
};

export default useInput;
