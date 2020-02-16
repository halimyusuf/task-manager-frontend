export default function paginate(items, pageNumber, pageSize) {
    let startIndex = (pageNumber - 1) * pageSize
    return items.slice(startIndex, startIndex + pageSize);
}