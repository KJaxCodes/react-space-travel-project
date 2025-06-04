

export default function SpacecraftSelector({ handleSetSelectCraft, spacecrafts, currentCraft }) {

    //filter the spacecraft
    //get the whole object
    //the parent component must know the id of the spacecraft selected


    const handleSelect = (e) => {
        console.log(e.target.value);
        const selectedCraft = spacecrafts.filter(craft => craft.name === e.target.value)[0];
        console.log(selectedCraft);

        handleSetSelectCraft(selectedCraft);
    };

    return (
        <div>
            <label>Select Spacecraft</label>
            <select value={currentCraft.id} onChange={(e) => handleSelect(e)}>
                <option value="">{currentCraft.name ? currentCraft.name : "Select Spacecraft"}</option>
                {
                    spacecrafts.map((craft) => {
                        return (
                            <option key={craft.id} value={craft.id}>{craft.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )

};