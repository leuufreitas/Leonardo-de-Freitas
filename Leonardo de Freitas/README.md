Hub de Soluções Digitais - Sala 4.0

Este projeto é um centralizador de ferramentas e ativos digitais voltado para o ambiente de Indústria 4.0. Ele permite que colaboradores acessem rapidamente links externos, dashboards e sistemas industriais (como PI e Metris) através de uma interface intuitiva e responsiva.

Funcionalidades Principais

1. Vitrine de Ativos: Visualização dinâmica de ferramentas cadastradas.
2. Busca em Tempo Real: Filtragem instantânea por nome ou categoria.
3. Painel Administrativo: Área restrita para gestão de ferramentas e usuários.
4. Segurança: Autenticação via login para acesso às funções de CRUD.
5. Banco de Dados Local: Persistência de dados utilizando SQLite para maior portabilidade.

Tecnologias Utilizadas

1. Back-end: Node.js com Express.
2. Banco de Dados: SQLite (com biblioteca sqlite3).
3. Front-end: HTML5, CSS3 (Grid e Flexbox) e JavaScript Vanilla.
4. Ícones: FontAwesome. 

Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
Node.js: (https://nodejs.org/en/) (versão 14 ou superior)

Instalação e Execução

1. Extraia o arquivo compactado.
2. Abra o terminal (ou CMD) dentro da pasta raiz do projeto.
3. Instale as dependências necessárias:
npm install
4. Inicie o servidor com o comando:
node server.js
5. O sistema estará disponível no seu navegador no endereço:
http://localhost:3000
6. Para acessar o painel de gerenciamento (inserir novo usuário ou inserir nova ferramenta), utilize as credenciais padrão:
Login: admin
Senha: admin
