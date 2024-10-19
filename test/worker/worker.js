onmessage = ({data}) => {
    setTimeout(() => {
        postMessage(data);
    }, 1000);
}