const URL = "/api/contact/";

export const submitContact = async (formData) => {
  console.log(formData);
  const res = await fetch(URL, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw data;
  else return data;
};

export const deleteHandler = async (id) => {
  const res = await fetch(URL + id, { method: "DELETE" });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const updateHandler = async ({ id, body }) => {
  const res = await fetch(URL + id, {
    method: "put",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};
