package com.hart.cosettle.spacephoto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpacePhotoRepository extends JpaRepository<SpacePhoto, Long> {
}
