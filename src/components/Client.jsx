import { useState } from "react";

const Client = (client) => {
  const [isVaccinated, setIsVaccinated] = useState(client.client.isVaccinated);
  return (
    <div>
      <h2>{client.client.name}</h2>
      <ul>
        {client.client.pets.map((pet) => (
          <li key={pet.name}>
            {pet.name} - {pet.type}
            <button
              onClick={() => {
                setIsVaccinated(!isVaccinated);
                fetch("/api/vet/pets", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: pet.name,
                    isVaccinated: !isVaccinated,
                  }),
                });
              }}
            >
              {isVaccinated ? "Vaccinated" : "Not vaccinated"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Client;