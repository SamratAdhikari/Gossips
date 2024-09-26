import GenderCheckbox from "./GenderCheckbox.jsx";

const Signup = () => {
    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Signup <span className="text-blue-500"> Gossips</span>
                </h1>

                <form>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Full Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full input input-bordered h-10"
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter a username"
                            className="w-full input input-bordered h-10"
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Password
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter a password"
                            className="w-full input input-bordered h-10"
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the password again"
                            className="w-full input input-bordered h-10"
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Choose Gender
                            </span>
                            <GenderCheckbox />
                        </label>
                    </div>

                    <div>
                        <button className="btn btn-block btn-sm mt-4">
                            Signup
                        </button>
                    </div>
                    <a
                        href="#"
                        className="text-sm hover:underline hover:text-blue-600 mt-2 block mx-auto text-center"
                    >
                        {"Already have an account?"}
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Signup;
