let today = new Date();

    let options = {
        day: "2-digit",
        month: "long",
        year: "numeric"
    };

    document.getElementById("date").innerText =
        today.toLocaleDateString("en-GB", options);