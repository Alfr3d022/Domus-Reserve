document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registroForm").addEventListener("submit", async function (event) {
       event.preventDefault(); 
 

       const nameRegistro = document.getElementById("nameRegistro").value;
       const emailRegistro = document.getElementById("emailRegistro").value;
       const senhaRegistro = document.getElementById("senhaRegistro").value;
 
       if (nameRegistro.trim() === "" || emailRegistro.trim() === "" || senhaRegistro.trim() === "") {
          alert("Por favor, preencha todos os campos.");
          return; 
       }
       const urlRegistro = "http://127.0.0.1:3000/registro";
       try {
          const response = await fetch(urlRegistro, {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
             },
             body: JSON.stringify({ name: nameRegistro, email: emailRegistro, password: senhaRegistro }),
          });
 
          if (response.ok) {
             alert("Registro bem-sucedido!");
             window.location.href = "login.html";
          } else if (response.status === 409) {
             alert("E-mail ou usuário já em uso!");
          } else {
             alert("Erro no servidor durante o registro.");
          }
       } catch (error) {
          console.error(error);
          alert("Erro ao processar a solicitação de registro.");
       }
    });
 });