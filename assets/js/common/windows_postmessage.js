window.addEventListener("message", (event) => {
        console.log("Message event:", event);
        if (event.origin !== "http://127.0.0.1:8000") return;
        localStorage.setItem("featureEnabled", event.data.message);
        localStorage.setItem("feature_key", event.data.key);
        localStorage.setItem("owner", event.data.owner);
        localStorage.setItem("repo_name", event.data.repo_name);
        document.getElementById("output").textContent =
          "Received message: " + JSON.stringify(event.data);
        event.source.postMessage({ reply: "Got your message!" }, event.origin);

      });
