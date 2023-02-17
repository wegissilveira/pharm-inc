export const getCurrentPage = () => {
   const path = window.location.pathname
   const page = path.substring(
      path.indexOf("=") + 1,
      path.indexOf("&")
   )

   return page
}