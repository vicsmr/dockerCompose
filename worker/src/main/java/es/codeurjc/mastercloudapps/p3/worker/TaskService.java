package es.codeurjc.mastercloudapps.p3.worker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;

	public NewTask saveTask(NewTask task) {
		System.out.println(task);
		return taskRepository.save(task);
	}

}
