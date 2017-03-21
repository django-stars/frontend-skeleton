from rest_framework import serializers
from emdyn_back.findface.models import ProcessJob, ProcessErrorLog, FaceList


class ProcessJobSerializer(serializers.ModelSerializer):
    errors = serializers.SerializerMethodField(method_name='get_failed_proces_name')

    class Meta:
        model = ProcessJob
        fields = ('id', 'start_time', 'end_time', 'error_count', 'errors', 'matches',
                  'total_count', 'success_count', 'user')


    def get_failed_process_name(self, obj):
        return obj.failed_process_count


class ProcessQueueSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProcessJob
        fields = ('id', 'start_time', 'end_time', 'user')


class ProcessErrorSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProcessErrorLog
        fields = ('id', 'image_name', 'created_on', 'error_message', 'error_source', 'process')


class FaceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaceList
        fields = ('id', 'image_name', 'created_on', 'matches_count')
