export function getTrainings() {
    return fetch(import.meta.env.VITE_API_URL + "gettrainings")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when fetching trainings");
            }
            return response.json();
        });
}

export function deleteTraining(url: string) {
    return fetch(url, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong in deletion");
            }
        });
}