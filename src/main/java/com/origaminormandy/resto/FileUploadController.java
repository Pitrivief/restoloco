package com.origaminormandy.resto;


import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
@ControllerAdvice
public class FileUploadController {

	private final FileStorageService storageService;
	
	@Value("${spring.servlet.multipart.max-file-size}")
	private String maxFileSize;

	@Autowired
	public FileUploadController(FileStorageService storageService) {
		this.storageService = storageService;
	}

	@GetMapping("/admin/files")
	public String listUploadedFiles(Model model) throws IOException {

		model.addAttribute("files", storageService.loadAll().map(
				path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
						"serveFile", path.getFileName().toString()).build().toUri().toString())
				.collect(Collectors.toList()));

		return "/admin/upload-file";
	}

	@GetMapping("/admin/files/{filename:.+}")
	public @ResponseBody ResponseEntity<Resource> serveFile(@PathVariable String filename) {

		Resource file = storageService.loadAsResource(filename);
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
				"attachment; filename=\"" + file.getFilename() + "\"").body(file);
	}
	
	public Optional<String> getExtensionByStringHandling(String filename) {
	    return Optional.ofNullable(filename)
	      .filter(f -> f.contains("."))
	      .map(f -> f.substring(filename.lastIndexOf(".") + 1));
	}
	
	@GetMapping("/files/{filename:.+}")
	    public ResponseEntity<byte[]> getImage(@PathVariable String filename) throws IOException {

	    	Resource imgFile = storageService.loadAsResource(filename);
	        byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());

	        
	        Optional<String> extension = getExtensionByStringHandling(imgFile.getFilename());
	        
	        
	        MediaType mediaType;
	        if(extension.isPresent()) {
	        	switch (extension.get().toLowerCase()) {
				case "jpg":
				case "jpeg":
					mediaType = MediaType.IMAGE_JPEG;
					break;
				case "png":
					mediaType = MediaType.IMAGE_PNG;
					break;

				default:
					mediaType = null;
					break;
				}
	        	
	        	
	        	 return ResponseEntity
	 	                .ok()
	 	                .contentType(mediaType)
	 	                .body(bytes);
	        }else {
	        	throw new FileNotFoundException();
	        }
	        
	       
	    }

	@PostMapping("/admin/files")
	public String handleFileUpload(@RequestParam("file") MultipartFile file,
			RedirectAttributes redirectAttributes) throws IllegalStateException, IOException {

		storageService.store(file);
		
		redirectAttributes.addFlashAttribute("message",
				"You successfully uploaded " + file.getOriginalFilename() + "!");

		return "redirect:/admin/files";
	}
	
	@PostMapping("/admin/files-ajax")
	public @ResponseBody Map<String, String> handleFileUploadAjax(@RequestParam("file") MultipartFile file,
			RedirectAttributes redirectAttributes) throws IllegalStateException, IOException {

		
		
		storageService.store(file);
		
		redirectAttributes.addFlashAttribute("message",
				"You successfully uploaded " + file.getOriginalFilename() + "!");

		Map<String, String> result = new HashMap<>();
		result.put("file", file.getOriginalFilename());
		
	
		return result;
		
		
	}
	
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public @ResponseBody ResponseEntity<?> handleStorageFileNotFound(MaxUploadSizeExceededException e) {
		Map<String, String> result = new HashMap<>();
		result.put("error", "Taille de fichier limité à " + maxFileSize);
		return ResponseEntity.badRequest().body(result);
	}


}