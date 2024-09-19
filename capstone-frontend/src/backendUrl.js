const backendUrl = () => {
    console.log(window.location.href);
    if (window.location.href.includes("localhost")) {
        return "http://localhost:3001";
    }
    return "https://capstone-backend-proud-log-5300.fly.dev";
};

export default backendUrl;
