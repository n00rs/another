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
