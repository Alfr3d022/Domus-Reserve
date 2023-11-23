document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", async function (event) {
      event.preventDefault(); 
  
      const emailLogin = document.getElementById("login").value;
      const senhaLogin = document.getElementById("senha").value;
  
      if (emailLogin.trim() === "" || senhaLogin.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return; 
      }
      const urlLogin = "http://127.0.0.1:3000/login";
      
      try {  
        const response = await fetch(urlLogin, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailLogin, senha: senhaLogin }),
        });
  
        if (response.ok) {
          alert("Login bem-sucedido!");
          window.location.href = "index.html";
        } else if (response.status === 401) {
          alert("Usuário ou senha incorretos.");
        } else {
          alert("Erro no servidor durante o login." + response.status);
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao processar a solicitação de login.");
      }
    });
  });
  