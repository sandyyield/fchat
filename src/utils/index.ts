import {  useEffect, useState } from "react"

/**
 * debounce hook 配合useEffect食用
 * @param value 
 * @param delay 
 * @returns 
 */
export const useDebounced = <T>(value: T, delay = 500) => {
    const [state, setState] = useState<T>(value)
    useEffect(() => {
        let timer = setTimeout(() => setState(value), delay);
        return () => {
            clearTimeout(timer);
        }
    }, [value, delay])
    return state;
}

// const useDebounce = (fn: () => void, delay = 500, dep = []) => {
//     let timer: number;
//     const { current } = useRef({ fn, timer: -2 });
//     useEffect(function () {
//         current.fn = fn;
//     }, [fn]);

//     return useCallback(function f(...args) {
//         if (current.timer != -2) {
//             clearTimeout(current.timer);
//         }
//         current.timer = window.setTimeout(() => {
//             current.fn();
//         }, delay);
//     }, dep)
// }