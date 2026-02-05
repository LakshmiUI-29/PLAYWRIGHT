function launch_browser(browser_name) {
    if(browser_name === "Chrome"){
        return "Launching Chrome browser";

    } else if(browser_name === "Firefox"){
        return "Launching Firefox browser";

    } else {
        return "Unknown browser";
    }
}
function run_tests(tests){
    switch(tests){
        case "smoke":
            return "Running smoke tests";
        case "regression":
            return "Running regression tests";
        case "sanity":
            return "Running sanity tests";
        default:
            return "Unknown test suite";
    }
}

console.log(launch_browser("Chrome"));
console.log(launch_browser("Safari"));
console.log(run_tests("smoke"));
console.log(run_tests("performance"));
