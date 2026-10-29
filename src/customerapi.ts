export function getCustomers() {
    return fetch(import.meta.env.VITE_API_URL + "customers")
    .then(response => {
            if(!response.ok) {
                throw new Error("Error when fetching customers");
            }
            return response.json();
        })
}