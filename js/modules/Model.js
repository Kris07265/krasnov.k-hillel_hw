class Model {
    constructor() {
        this.users = [];
    }

    getAll(){
        return (
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
                .then(users => {
                    this.users = users
                    return users;
                })
                .catch(err => {
                    throw err;
                })
                .finally(() => console.log("loading finished"))
        )
    }

    async create(userData) {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            return await res.json();
        } catch (error) {
            throw error;
        }
    }

    async update(id, userData) {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            return await res.json();
        }
        catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE'
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}

export default Model;