class Model {
    #users = null;
    constructor() {
        this.#users = [];
    }

    getUsers() {
        return [...this.#users];
    }

    getUser(id) {
        return this.#users.find(user => user.id === id);
    }

    getAll(){
        return (
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
                .then(users => {
                    this.#users = users
                    return users;
                })
                .catch(err => {
                    throw err;
                })
                .finally(() => "loading finished")
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
            const user = await res.json();
            const lastId = this.#users.length ? this.#users[this.#users.length - 1].id : 0;
            user.id = lastId + 1;
            this.#users.push(user);

            return user;
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
            const updatedUser = await res.json();

            const index = this.#users.findIndex(user => user.id === id);
            this.#users[index] = { ...updatedUser, id };

            return updatedUser;
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
            const index = this.#users.findIndex(user => user.id === id);
            if (index !== -1) {
                this.#users.splice(index, 1);
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}

export default Model;