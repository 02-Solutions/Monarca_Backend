## **Proyecto Monarca - Backend**

Este repositorio forma parte de **Proyecto Monarca**, una iniciativa estratégica diseñada para revolucionar la gestión de viajes empresariales mediante una plataforma integral, segura y altamente adaptable.  

## Requisitos

- Node.js (usamos `nvm` para manejar versiones)
- `npm` (Node Package Manager)
- `direnv`

> Al entrar al repo, corre `direnv allow` si es la primera vez.

## ⚙️ Instalación de herramientas
Instalar **direnv**

- macOS: `brew install direnv`

Agrega el siguiente hook a tu shell:
```bash
# Bash
echo 'eval "$(direnv hook bash)"' >> ~/.bashrc

# Zsh
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
```

Habilitar **direnv** para este repositorio
```bash
direnv allow
```

Instalar **nvm** y **Node.js**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

source ~/.bashrc # o ~/.zshrc según tu shell

nvm install
```

## Instalación del Proyecto

```bash
npm install
```

### Levantar en local

```bash
npm run dev
```

### Variables de entorno
Crear un archivo `.env` con el contenido especificado en el `.env.example`:

```bash

```

