import { logger } from "./middleware/logger";
app.use(logger);
app.use((req, res)=>{
    res.status(404).render('404', {title: "página não encontrada"})
});