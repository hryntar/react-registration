import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
const getLocalValue = (key: string, initValue: string | boolean | Function) => {
   //SSR Next.js
   if (typeof window === "undefined") return initValue; 
   
   // if already exist
   const localValue = JSON.parse(localStorage.getItem(key)!); 
   if (localValue) return localValue;

   // return result of a function
   if (initValue instanceof Function) return initValue();

   return initValue;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const useLocalStorage = (key: string, initValue: string | boolean | Function) => {
   const [value, setValue] = useState(() => {
      return getLocalValue(key, initValue);
   });

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
   }, [key, value]);

   return [value, setValue];
};

export default useLocalStorage;
