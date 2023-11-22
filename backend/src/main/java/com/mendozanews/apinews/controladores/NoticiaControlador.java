package com.mendozanews.apinews.controladores;

import com.mendozanews.apinews.entidades.Noticia;
import com.mendozanews.apinews.excepciones.MiException;
import com.mendozanews.apinews.servicios.NoticiaServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/noticia")
public class NoticiaControlador {

    @Autowired
    private NoticiaServicio ns;

    @GetMapping("/listar")
    public List<Noticia> listaNoticias() {
        try {
            List<Noticia> noticias = ns.listarNoticias();
            System.out.println("Carga de noticias");
            return noticias;
        } catch (Exception e) {
            System.out.println("No carga las noticias: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/autor/{idAutor}")
    public List<Noticia> listaNoticiasAutor(@PathVariable String idAutor) {
        try {
            List<Noticia> noticias = ns.buscarPorAutor(idAutor);
            System.out.println("Carga de noticias");
            return noticias;
        } catch (Exception e) {
            System.out.println("No carga las noticias: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/seccion")
    public List<Noticia> listaUnaDeCadaSeccion() {
        try {
            List<Noticia> noticias = ns.unaPorSeccion();
            System.out.println("Carga de noticias");
            return noticias;
        } catch (Exception e) {
            System.out.println("No carga las noticias: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/seccion/{idSeccion}")
    public List<Noticia> listaNoticiasSeccion(@PathVariable String idSeccion) {
        try {
            List<Noticia> noticias = ns.buscarPorSeccion(idSeccion);
            System.out.println("Carga de noticias");
            return noticias;
        } catch (Exception e) {
            System.out.println("No carga las noticias: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/seccion/{idSeccion}/6")
    public List<Noticia> lista6PorSeccion(@PathVariable String idSeccion) {
        try {
            List<Noticia> noticias = ns.buscar6PorSeccion(idSeccion);
            System.out.println("Carga de noticias");
            return noticias;
        } catch (Exception e) {
            System.out.println("No carga las noticias: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/principales")
    public List<Noticia> listaNoticiasPrincipales() {
        try {
            List<Noticia> noticias = ns.listarPrincipales();
            System.out.println("Carga de noticias principales");
            return noticias;
        } catch (MiException e) {
            System.out.println("No carga las noticias principales: " + e.getMessage());
            return null;
        }
    }

    @PostMapping("/nueva")
    public ResponseEntity<String> registrar(@RequestParam String titulo, @RequestParam String subtitulo,
            @RequestParam String idSeccion, @RequestParam String idAutor,
            @RequestParam MultipartFile portada, @RequestParam("imagenes") List<MultipartFile> imagenes,
            @RequestParam("parrafos") List<String> parrafos, @RequestParam("etiquetas") List<String> etiquetas) {
        try {
            ns.cargarNoticia(titulo, subtitulo, parrafos, etiquetas, idSeccion, idAutor, portada, imagenes);
            return ResponseEntity.ok("Exito al cargar la noticia");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al cargar la noticia: " + ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Noticia noticia(@PathVariable String id) {
        return ns.getOne(id);
    }

    @PostMapping("/editar/{id}")
    public void editarNoticia(@PathVariable("id") String id, @RequestParam String titulo,
            @RequestParam String subtitulo, @RequestParam List<String> parrafos,
            List<String> etiquetas, @RequestParam String idSeccion, @RequestParam String idAutor,
            @RequestParam MultipartFile portada, List<MultipartFile> imagenes, ModelMap modelo) {
        try {
            ns.modificarNoticia(titulo, subtitulo, parrafos, etiquetas, idSeccion, idAutor, portada, id);
            modelo.put("exito", "Noticia modificada con éxito");

        } catch (MiException ex) {
            modelo.put("error", ex.getMessage());
        }
    }

    @PostMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") String id) throws MiException {
        try {
            ns.eliminarNoticiaId(id);
            return ResponseEntity.ok("Exito al eliminar la noticia");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar la noticia: " + ex.getMessage());
        }
    }
}
