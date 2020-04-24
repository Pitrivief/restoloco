package com.origaminormandy.resto;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Service
public class FileStorageService {

	@Value("${filestorageservice.directory}")
	private String directory;
	
	public FileStorageService() {
		
	}
	
	@PostConstruct
	public void init() {
		System.out.println("init filestorageservice");
		Path dir = Paths.get(directory);
		try {
			Files.createDirectories(dir);
		} catch (IOException e) {
			System.out.println("Unable to create " + directory);
		}
		
	}

	public void store(MultipartFile uploadedFile) throws IllegalStateException, IOException {
		
		
		String destination = directory + uploadedFile.getOriginalFilename();
	    File file = new File(destination);
	    uploadedFile.transferTo(file);
	    
	    System.out.println(file.getAbsolutePath());
	    
	}

	public Stream<Path> loadAll() throws IOException{
		
		return Files.walk(Paths.get(directory)).filter(Files::isRegularFile);
		
	}

	public Path load(String filename) {
		return Paths.get(directory + filename);
		
	}

	public Resource loadAsResource(String filename) {
		return new FileSystemResource(directory + filename);
	}

	
	public void deleteAll() {
		Paths.get(directory).forEach(path -> {
			try {
				Files.delete(path);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});
	}
}
