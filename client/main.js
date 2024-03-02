const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortune");
const addFortuneBtn = document.getElementById("addFortuneButton");
const updateFortuneBtn = document.getElementById("updateFortuneButton");
const deleteFortuneBtn = document.getElementById("deleteFortuneButton")

const baseURL = "http://localhost:4000/api/compliment/"



const getCompliment = () => {
    axios.get(baseURL)
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune").then(res => {
        const data = res.data;
        alert(data);
    });
};



const postFortune = () => {
    const newFortuneInput = document.getElementById("newFortuneInput");
    const newFortune = { newFortune: newFortuneInput.value };

    if(newFortune.newFortune.trim() !== "") {
        axios.post("http://localhost:4000/api/fortune", newFortune)
            .then(res => {
                alert("Fortune added successfully");
                newFortuneInput.value = ''; 
            })
            .catch(error => {
                console.error("Error adding fortune:", error);
                alert("Failed to add fortune");
            });
    } else {
        alert("Please enter a fortune before submitting.");
    }
};

const fetchAndPopulateFortunes = () => {
    axios.get("http://localhost:4000/api/fortunes")
    .then(res => {
        const fortunes = res.data;
        const fortuneSelect = document.getElementById("fortuneSelect");
        fortuneSelect.innerHTML = '';
        let placeholderOption = new Option("Select Your Fortune to Edit", "");
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        fortuneSelect.appendChild(placeholderOption);
        fortunes.forEach((fortune, index) => {
            let option = new Option(fortune, index);
            fortuneSelect.add(option);
        });
    })
    .catch(error => console.error("Failed to fetch fortunes:", error));
};
fetchAndPopulateFortunes();

const updateFortune = () => {
    const fortuneSelect = document.getElementById("fortuneSelect");
    const updateFortuneInput = document.getElementById("updateFortuneInput");
    const selectedFortuneIndex = fortuneSelect.value;
    const newFortune = updateFortuneInput.value;

    if(newFortune.trim() !== "") {
        axios.put("http://localhost:4000/api/fortune", { index: selectedFortuneIndex, newFortune })
            .then(res => {
                alert("Fortune updated successfully");
                updateFortuneInput.value = '';
                fetchAndPopulateFortunes();
            })
            .catch(error => {
                console.error("Error updating fortune:", error);
                alert("Failed to update fortune");
            });
    } else {
        alert("Please enter a fortune before submitting.");
    }
};

const deleteFortune = () => {
    const fortuneSelect = document.getElementById("fortuneSelect");
    const selectedFortuneIndex = fortuneSelect.value; // Get selected index

    if(selectedFortuneIndex) {
        axios.delete(`http://localhost:4000/api/fortune/${selectedFortuneIndex}`)
            .then(res => {
                alert("Fortune deleted successfully");
                fortuneSelect.remove(fortuneSelect.selectedIndex);
                fortuneSelect.value = "";
                fetchAndPopulateFortunes();
            })
            .catch(error => {
                console.error("Error deleting fortune:", error);
                alert("Failed to delete fortune");
            });
    } else {
        alert("Please select a fortune to delete.");
    }
};

addFortuneBtn.addEventListener("click", postFortune);
fortuneBtn.addEventListener('click', getFortune);
complimentBtn.addEventListener('click', getCompliment);
updateFortuneBtn.addEventListener("click", updateFortune);
deleteFortuneBtn.addEventListener("click", deleteFortune);
