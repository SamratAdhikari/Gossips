const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
    return (
        <div className="flex mt-0 gap-4">
            <div className="form-control">
                <label
                    className={`label gap-1 cursor-pointer ${
                        selectedGender === "male" ? "selected" : ""
                    }/`}
                >
                    <span className="label-text">Male</span>
                    <input
                        type="checkbox"
                        checked={selectedGender === "male"}
                        onChange={() => onCheckboxChange("male")}
                        className="checkbox border-slate-500"
                    />
                </label>
            </div>
            <div className="form-control">
                <label
                    className={`label gap-1 cursor-pointer ${
                        selectedGender === "female" ? "selected" : ""
                    }/`}
                >
                    <span className="label-text">Female</span>
                    <input
                        type="checkbox"
                        checked={selectedGender === "female"}
                        onChange={() => onCheckboxChange("female")}
                        className="checkbox border-slate-500"
                    />
                </label>
            </div>
        </div>
    );
};

export default GenderCheckbox;
