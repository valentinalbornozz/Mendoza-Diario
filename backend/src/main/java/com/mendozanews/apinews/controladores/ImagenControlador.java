package com.mendozanews.apinews.controladores;

import com.mendozanews.apinews.entidades.Autor;
import com.mendozanews.apinews.entidades.Noticia;
import com.mendozanews.apinews.entidades.Seccion;
import com.mendozanews.apinews.entidades.Usuario;
import com.mendozanews.apinews.excepciones.MiException;
import com.mendozanews.apinews.servicios.AutorServicio;
import com.mendozanews.apinews.servicios.ImagenServicio;
import com.mendozanews.apinews.servicios.NoticiaServicio;
import com.mendozanews.apinews.servicios.SeccionServicio;
import com.mendozanews.apinews.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/imagen")
public class ImagenControlador {

    @Autowired
    private ImagenServicio is;

    @Autowired
    private NoticiaServicio ns;

    @Autowired
    private AutorServicio as;

    @Autowired
    private SeccionServicio ss;

    @Autowired
    private UsuarioServicio us;

    // BUSCAR IMAGEN POR ID
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> imagen(@PathVariable("id") String idImagen) {

        byte[] imagen = is.getOne(idImagen).getContenido();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity<>(imagen, headers, HttpStatus.OK);
    }

    // BUSCAR PORTADA POR ID DE NOTICIA
    @GetMapping("/noticia/{id}")
    public ResponseEntity<byte[]> imagenPortada(@PathVariable("id") String id) {

        Noticia noticia = ns.getOne(id);

        byte[] imagen = noticia.getPortada().getContenido();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity<>(imagen, headers, HttpStatus.OK);
    }

    // BUSCAR FOTO POR ID DE AUTOR
    @GetMapping("/autor/{id}")
    public ResponseEntity<byte[]> imagenAutor(@PathVariable("id") String idAutor) {

        Autor autor = as.getOne(idAutor);

        byte[] imagen = autor.getFoto().getContenido();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity<>(imagen, headers, HttpStatus.OK);
    }

    // BUSCAR ICONO POR CODIGO DE SECCION
    @GetMapping("/seccion/{id}")
    public ResponseEntity<byte[]> imagenSeccion(@PathVariable("id") String id) {

        Seccion seccion = ss.getOne(id);

        byte[] imagen = seccion.getIcono().getContenido();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity<>(imagen, headers, HttpStatus.OK);
    }

    // BUSCAR IMAGEN POR ID DE USUARIO
    @GetMapping("/usuario/{id}")
    public ResponseEntity<byte[]> imagenUsuario(@PathVariable("id") String idUsuario) {

        Usuario usuario = us.getOne(idUsuario);

        byte[] imagen = usuario.getImagen().getContenido();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity<>(imagen, headers, HttpStatus.OK);
    }

    // ELIMINA UNA IMAGEN POR SU ID
    @PostMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") String id) throws MiException {
        try {
            is.eliminarImagenId(id);
            return ResponseEntity.ok("Exito al eliminar la imagen");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar la imagen: " + ex.getMessage());
        }
    }
}
