export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    if (pathname === "/universe") {
      document.body.style.backgroundImage =
        "url('./assets/mountains-universe02.png')"
    } else if (pathname === "/explore") {
      document.body.style.backgroundImage =
        "url('./assets/mountains-universe-3.png')"
    } else {
      document.body.style.backgroundImage =
        "url('./assets/mountains-universe-1.png')"
    }

    // Remover a classe 'active' de todos os links
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => link.classList.remove("active"))

    // Adicionar a classe 'active' ao link correspondente à página atual
    const currentLink = document.querySelector(`.nav-link[href="${pathname}"]`)
    if (currentLink) {
      currentLink.classList.add("active")
    }

    document.body.style.backgroundSize = "100%" // Cobrir completamente sem distorção

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html
      })
  }
}
