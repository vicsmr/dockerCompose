package es.codeurjc.mastercloudapps.p3.worker;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<NewTask, Long> {

}