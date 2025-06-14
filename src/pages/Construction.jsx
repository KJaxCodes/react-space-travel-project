import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
//useForm from react hook form library for error validation
import SpaceTravelApi from "../services/SpaceTravelApi";

function Construction() {
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

    const navigate = useNavigate()

    //handle submit
    async function onSubmit(data) {
        const response = await SpaceTravelApi.buildSpacecraft(data);
        if (!response.isError) {
            reset();
            navigate("/spacecrafts"); //go back to the spacecrafts page
        } else {
            setError("Failed to create spacecraft.");
        }
    }


    return (
        <div>
            <h2>🛠️Build a New Spacecraft</h2>


            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="Input">
                    <label>Name: </label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        //react hook form syntax added to each input, required: applies error message
                        type="text"
                        placeholder="name"
                        className={`Input ${errors.name ? "input-error" : ""}`}
                        //add className when an error appears to change styling when error present
                        id="name"
                    />
                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                </div>
                <div className="Input">
                    <label>Capacity: </label>
                    <input
                        {...register("capacity", {
                            required: "Quantity is required",
                            min: { value: 500, message: "Must be at least 500" }
                        })}
                        type="number"
                        placeholder="capacity"
                        className={`Input ${errors.capacity ? "input-error" : ""}`}
                        id="capacity"
                    />
                    {errors.capacity && <p className="error-message">{errors.capacity.message}</p>}
                </div>
                <div className="Input">
                    <label>Description: </label>
                    <textarea
                        {...register("description", { required: "Description is required", })}
                        placeholder="description"
                        className={`Input ${errors.description ? "input-error" : ""}`}
                        id="description"
                    />
                    {errors.description && (
                        <p className="error-message">{errors.description.message}</p>
                    )}
                </div>
                <div className="Input">
                    <label>Picture URL: </label>
                    <input
                        {...register("pictureUrl")}
                        type="url"
                        id="pictureUrl"
                    />
                </div>

                <button type="submit">Build Spacecraft</button>
            </form>
        </div>
    );

}

export default Construction;