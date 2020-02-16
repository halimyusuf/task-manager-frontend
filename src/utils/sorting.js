export function asc(param) {
    if (param === "date") {
        return function (a, b) {
            let new_a = new Date(a.createdOn).getTime()
            let new_b = new Date(b.createdOn).getTime()
            if (new_a > new_b) return 1;
            if (new_a < new_b) return -1;
            return 0;
        }
    }
    return function (a, b) {
        if (a[param].toLowerCase() > b[param].toLowerCase()) return 1;
        if (a[param].toLowerCase() < b[param].toLowerCase()) return -1;
        return 0;
    }
}

export function desc(param) {
    if (param === "date") {
        return function (a, b) {
            let new_a = new Date(a.createdOn).getTime()
            let new_b = new Date(b.createdOn).getTime()
            if (new_a > new_b) return -1;
            if (new_a < new_b) return 1;
            return 0
        }
    }
    return function (a, b) {
        if (a[param].toLowerCase() > b[param].toLowerCase()) return -1;
        if (a[param].toLowerCase() < b[param].toLowerCase()) return 1;
        return 0;
    }
}