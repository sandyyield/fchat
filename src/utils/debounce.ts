export const debounce = (fn: Function, deley = 500) => {
    let timer: number | null = null;
    return () => {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, deley);
    }
}