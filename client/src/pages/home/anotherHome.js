import styles from "./styles.module.css";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 style={{ textAlign: "center" }}>
                    {" "}
                    {`My Another Chat Room`}{" "}
                </h1>
                <input className={styles.input} placeholder='Username...' />

                <select className={styles.input}>
                    <option>-- Select Room --</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='node'>Node</option>
                    <option value='express'>Express</option>
                    <option value='react'>React</option>
                </select>

                <button className='btn btn-secondary' style={{ width: "100%" }}>
                    JOIN ROOM
                </button>
            </div>
        </div>
    );
};
export default Home;
