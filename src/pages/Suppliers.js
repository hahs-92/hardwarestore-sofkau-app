import { Link } from "react-router-dom"

export const Suppliers = () => {

    return (
        <main>
            <section>
                <Link to="/suppliers/create" >Add Supplier</Link>
            </section>

            <section>
                <div>
                    <h3>Id:</h3>
                </div>
                <div>
                   <h3>Name:</h3>
                </div>
                <div>
                   <h3>PhoneNumber:</h3>
                </div>
                <div>
                   <h3>Email:</h3>
                </div>
                <div>
                    <h3>Actions</h3>
                </div>
            </section>

            <section>
                <article>
                    <section>
                        <h4>Id</h4>
                    </section>
                    <section>
                        <h4>Name</h4>
                    </section>
                    <section>
                        <h4>PhoneNumber</h4>
                    </section>
                    <section>
                        <h4>Emial:</h4>
                    </section>
                    <section>
                        <Link to="/suppliers/update/6">Edit</Link>
                        <button>Delete</button>
                    </section>
                </article>
            </section>
        </main>
    )
}
