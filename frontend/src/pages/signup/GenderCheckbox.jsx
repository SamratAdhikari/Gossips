const GenderCheckbox = () => {
    return (
        <div className="flex mt-0 gap-4">
            <div className="form-control">
                <label className="label gap-1 cursor-pointer">
                    <span className="label-text">Male</span>
                    <input
                        type="checkbox"
                        className="checkbox border-slate-500"
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label gap-1 cursor-pointer">
                    <span className="label-text">Female</span>
                    <input
                        type="checkbox"
                        className="checkbox border-slate-500"
                    />
                </label>
            </div>
        </div>
    );
};

export default GenderCheckbox;
