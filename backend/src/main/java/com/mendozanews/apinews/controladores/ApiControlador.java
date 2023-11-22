package com.mendozanews.apinews.controladores;

import com.mendozanews.apinews.excepciones.MiException;
import com.mendozanews.apinews.servicios.NoticiaServicio;
import com.mendozanews.apinews.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ApiControlador {

    @Autowired
    private NoticiaServicio ns;

    @Autowired
    private UsuarioServicio us;

    // ESTA RUTA CARGA UN USUARIO ADMIN EN LA DB
    // Comentado: CREA 10 NOTICIAS, 10 AUTORES Y 10 SECCIONES DE EJEMPLO SI LA DB
    // ESTA VACIA O TIENE POCAS ENTIDADES GUARDADAS
    @GetMapping("/iniciar")
    public String iniciar() throws MiException {
        try {
            us.usuarioAdmin();
            return "Admin cargado";
            // return ns.iniciarPreloads(10);
        } catch (MiException e) {
            return "Error: " + e.getMessage();
        }
    }

} // end PortalControlador
