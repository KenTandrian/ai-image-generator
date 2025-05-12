resource "google_apphub_application" "ai_image_generator" {
  application_id = "ai-image-generator"
  description    = "AI Image Generator application"
  display_name   = "AI Image Generator"
  location       = var.region

  attributes {
    criticality { type = "MISSION_CRITICAL" }
    environment { type = "PRODUCTION" }
  }

  scope {
    type = "REGIONAL"
  }
}

locals {
  cloud_functions = {
    "generateImage"       = "Generate Image"
    "getImage"            = "Get Image"
    "getImages"           = "Get Images"
    "getPromptSuggestion" = "Get Prompt Suggestion"
  }
}

data "google_cloudfunctions2_function" "functions" {
  for_each = local.cloud_functions
  name     = each.key
  location = var.region
}

data "google_cloud_run_service" "services" {
  for_each = local.cloud_functions
  name     = lower(each.key)
  location = var.region
}

data "google_apphub_discovered_service" "gcf_services" {
  for_each    = local.cloud_functions
  location    = var.region
  service_uri = "//cloudfunctions.googleapis.com/projects/${var.project_id}/locations/${var.region}/functions/${data.google_cloudfunctions2_function.functions[each.key].name}"
}

data "google_apphub_discovered_service" "gcr_services" {
  for_each    = local.cloud_functions
  location    = var.region
  service_uri = "//run.googleapis.com/projects/${var.project_id}/locations/${var.region}/services/${data.google_cloud_run_service.services[each.key].name}"
}

resource "google_apphub_service" "gcf_services" {
  for_each           = local.cloud_functions
  application_id     = google_apphub_application.ai_image_generator.application_id
  discovered_service = data.google_apphub_discovered_service.gcf_services[each.key].name
  display_name       = "Cloud Functions - ${each.value}"
  location           = var.region
  service_id         = "gcf-${lower(each.key)}"

  attributes {
    criticality { type = "MISSION_CRITICAL" }
    environment { type = "PRODUCTION" }
  }
}

resource "google_apphub_service" "gcr_services" {
  for_each           = local.cloud_functions
  application_id     = google_apphub_application.ai_image_generator.application_id
  discovered_service = data.google_apphub_discovered_service.gcr_services[each.key].name
  display_name       = "Cloud Run - ${each.value}"
  location           = var.region
  service_id         = "gcr-${lower(each.key)}"

  attributes {
    criticality { type = "MISSION_CRITICAL" }
    environment { type = "PRODUCTION" }
  }
}
