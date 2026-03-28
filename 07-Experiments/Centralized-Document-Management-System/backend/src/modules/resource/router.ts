import { Router } from 'express';
import { ResourceController } from './controller';

const router = Router();
const controller = new ResourceController();

// Folder & Resource Listing
router.post('/folder', controller.createFolder);
router.get('/search', controller.searchResources);
router.get('/', controller.listResources);

// Storage & Upload
router.post('/upload-url', controller.getUploadUrl);
router.post('/confirm-upload', controller.confirmUpload);

// Multi-resource operations
router.delete('/:id', controller.deleteResource);

export default router;
