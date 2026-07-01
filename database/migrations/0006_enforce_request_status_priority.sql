CREATE TRIGGER IF NOT EXISTS trg_service_requests_status_priority_insert
BEFORE INSERT ON service_requests
FOR EACH ROW
WHEN NEW.status NOT IN ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')
	OR NEW.priority NOT IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')
BEGIN
	SELECT RAISE(ABORT, 'Invalid service request status or priority');
END;

CREATE TRIGGER IF NOT EXISTS trg_service_requests_status_priority_update
BEFORE UPDATE OF status, priority ON service_requests
FOR EACH ROW
WHEN NEW.status NOT IN ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')
	OR NEW.priority NOT IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')
BEGIN
	SELECT RAISE(ABORT, 'Invalid service request status or priority');
END;
